import React, { useState } from "react";
import { Input, Button, Slider } from "@nextui-org/react";
import { toast } from "sonner";
import { useAuth } from "../../auth/authContext";

export default function FeedBackSection() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Feedback submitted");
    } catch {
      toast.error("Error submitting feedback");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="scroll-to-feedback"
      className="w-full max-w-[90%] mx-auto p-6 rounded-[40px] bg-zinc-950 my-[10vh] flex flex-col md:flex-row"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full md:w-1/2"
      >
        <Input name="name" placeholder="Name" required />
        <Input name="email" placeholder="Email" required />
        <textarea
          name="feedback"
          placeholder="Feedback"
          className="p-3 rounded-md"
          required
        />
        <Slider name="experience" maxValue={5} minValue={1} defaultValue={5} />
        <Button isLoading={loading} type="submit" color="success">
          Submit
        </Button>
      </form>
    </div>
  );
}
