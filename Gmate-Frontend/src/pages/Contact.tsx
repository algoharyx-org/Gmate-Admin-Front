import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  Globe,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useContact } from "@/hooks/useContact";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { contact, isPending } = useContact();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    contact(data, { onSettled: () => reset() });
  };

  return (
    <div className="bg-background text-foreground relative min-h-screen overflow-hidden selection:bg-indigo-500/30">
      {/* --- Atmospheric Background --- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] h-[40%] w-[40%] animate-pulse rounded-full bg-indigo-600/5 blur-[120px] dark:bg-indigo-600/10" />
        <div className="absolute bottom-[20%] left-[5%] h-[35%] w-[35%] rounded-full bg-purple-500/5 blur-[100px] dark:bg-purple-500/10" />
      </div>

      <div className="relative z-10 px-6 pt-48 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
            {/* --- Left Side: Info --- */}
            <div className="animate-in fade-in slide-in-from-left-8 space-y-12 duration-1000">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase shadow-sm dark:text-indigo-400">
                  <Globe size={14} />
                  <span>Available Worldwide</span>
                </div>
                <h1 className="text-foreground text-5xl leading-[1.1] font-black tracking-tight sm:text-7xl">
                  Let's build something{" "}
                  <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent dark:from-indigo-400 dark:to-cyan-400">
                    great
                  </span>{" "}
                  together.
                </h1>
                <p className="text-muted-foreground max-w-lg text-xl leading-relaxed font-medium">
                  Have a question about enterprise plans, custom workflows, or
                  just want to say hi? We're all ears.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-card/50 border-border group flex items-center gap-6 rounded-2xl border p-6 backdrop-blur-md transition-all hover:border-indigo-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 transition-transform group-hover:scale-110">
                    <Mail
                      className="text-indigo-500 dark:text-indigo-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                      Email us at
                    </p>
                    <p className="text-foreground text-lg font-bold">
                      hello@gmate.app
                    </p>
                  </div>
                </div>

                <div className="bg-card/50 border-border group flex items-center gap-6 rounded-2xl border p-6 backdrop-blur-md transition-all hover:border-cyan-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-transform group-hover:scale-110">
                    <MapPin
                      className="text-cyan-500 dark:text-cyan-400"
                      size={24}
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-[10px] font-black tracking-widest uppercase">
                      Our Studio
                    </p>
                    <p className="text-foreground text-lg font-bold">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <div className="bg-border h-px w-12" />
                <p className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
                  Follow our journey
                </p>
              </div>
            </div>

            {/* --- Right Side: Form --- */}
            <div className="animate-in fade-in slide-in-from-right-8 delay-200 duration-1000">
              <div className="bg-card/50 border-border relative overflow-hidden rounded-[2.5rem] border p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
                {/* Decoration */}
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative z-10 space-y-8"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-muted-foreground ml-1 text-[10px] font-black tracking-[0.2em] uppercase"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      disabled={isPending}
                      {...register("name")}
                      className={`bg-background/50 border-border placeholder:text-muted-foreground/50 text-foreground h-14 rounded-2xl font-medium transition-all focus:border-indigo-500/50 focus:ring-indigo-500/20 ${errors.name ? "border-rose-500/50" : ""}`}
                    />
                    {errors.name && (
                      <p className="ml-1 text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-muted-foreground ml-1 text-[10px] font-black tracking-[0.2em] uppercase"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      disabled={isPending}
                      {...register("email")}
                      className={`bg-background/50 border-border placeholder:text-muted-foreground/50 text-foreground h-14 rounded-2xl font-medium transition-all focus:border-indigo-500/50 focus:ring-indigo-500/20 ${errors.email ? "border-rose-500/50" : ""}`}
                    />
                    {errors.email && (
                      <p className="ml-1 text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-muted-foreground ml-1 text-[10px] font-black tracking-[0.2em] uppercase"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your team's goals..."
                      disabled={isPending}
                      {...register("message")}
                      className={`bg-background/50 border-border placeholder:text-muted-foreground/50 text-foreground min-h-40 resize-none rounded-2xl font-medium transition-all focus:border-indigo-500/50 focus:ring-indigo-500/20 ${errors.message ? "border-rose-500/50" : ""}`}
                    />
                    {errors.message && (
                      <p className="ml-1 text-[10px] font-bold tracking-widest text-rose-500 uppercase">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 group h-16 w-full rounded-2xl font-black tracking-widest uppercase shadow-xl transition-all active:scale-[0.98]"
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={18}
                          className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
