"use client"

import { getAllUsers, deleteUser, changeActive, createUser, updateUser } from "@/services/apiUser";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

import { User } from "@/lib/types";
import { UserFilters } from "@/components/UserFilters";
import { UserGrid } from "@/components/UserGrid";
import { UserPagination } from "@/components/UserPagination";
import { UserModal } from "@/components/UserModal";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allPages, setAllPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 6;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    
    const params: Record<string, string | number | boolean> = {
      page: currentPage,
      limit: usersPerPage,
    };
    
    if (searchQuery) params.search = searchQuery;
    if (roleFilter !== "all") params.role = roleFilter;
    if (statusFilter !== "all") params.active = statusFilter === "active";

    getAllUsers(params)
      .then((res: {users: User[], metadata: {totalPages: number}, totalPages: number, length: number}) => {
        const fetchedUsers = res?.users || res || [];
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
        if (res?.metadata?.totalPages) {
          setTotalPages(res.metadata.totalPages);
        } else {
          setTotalPages(1); 
        }

        if (res?.totalPages) {
          setAllPages(res.totalPages);
        } else {
          setAllPages(1);
        }

        if (res?.length) {
          setTotalUsers(res.length);
        } else {
          setTotalUsers(Array.isArray(fetchedUsers) ? fetchedUsers.length : 0);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPage, searchQuery, roleFilter, statusFilter, usersPerPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleToggleActive = async (id: string) => {
    try {
      setUsers((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, active: !item.active } : item
        )
      );
      await changeActive(id);
    } catch (error) {
      console.error("Failed to update active status:", error);
      fetchUsers();
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage(p => p - 1);
      } else {
        fetchUsers();
      }
      toast.success("User successfully deleted");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormData({ name: "", email: "", password: "", confirmPassword: "", role: "user" });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, password: "", confirmPassword: "", role: user.role });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (modalMode === "add") {
        await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
        });
        toast.success("User successfully created");
      } else if (modalMode === "edit" && selectedUser) {
        await updateUser(selectedUser._id,{
          name: formData.name,
          email: formData.email,
          role: formData.role,
        });
        toast.success("User successfully updated");
      }
      closeModal();
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Users
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user accounts and roles.
          </p>
        </div>
      </div>

      <UserFilters 
        searchQuery={searchQuery}
        setSearchQuery={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        roleFilter={roleFilter}
        setRoleFilter={(val) => { setRoleFilter(val); setCurrentPage(1); }}
        statusFilter={statusFilter}
        setStatusFilter={(val) => { setStatusFilter(val); setCurrentPage(1); }}
        onAddUserClick={openAddModal}
      />

      <UserGrid 
        isLoading={isLoading}
        users={users}
        searchQuery={searchQuery}
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        onClearFilters={clearFilters}
        onToggleActive={handleToggleActive}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <UserPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalUsers={totalUsers}
        allPages={allPages}
        onPageChange={setCurrentPage}
      />

      <UserModal 
        isOpen={isModalOpen}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
