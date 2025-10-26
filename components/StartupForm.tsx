"use client"

import { useActionState, useState } from "react";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send, Trash2, ExternalLink } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner"
import { createIdea } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("**Hello world!!!**");
    const router = useRouter();
    // useActionState is a Hook that allows you to update state based on the result of a form action.

    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [inputMode, setInputMode] = useState<'upload' | 'url'>('upload');

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setUploading(false);

        if (data.url) {
            setImageUrl(data.url);
            toast("✅ Image uploaded successfully!");
        } else {
            toast("❌ Image upload failed");
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "IDEAL",
    });
    // 1- Action function
    async function handleFormSubmit(prevState: any, formData: FormData) {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            // Validate form values
            await formSchema.parseAsync(formValues);

            // Create the idea and handle the result
            const result = await createIdea(prevState, formData, pitch);
            console.log({ result });

            if (result.status === "SUCCESS") {
                toast(
                    "Success",
                    {
                        description: "Your idea has been created successfully",
                    }
                );

                router.push(`/startup/${result._id}`);
            }
            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast(
                    "Error",
                    {
                        description: "Please check your input and try again",
                    }
                );

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast(
                "Error",
                { description: "An unexpected error occurred" }
            );

            return {
                ...prevState,
                error: "An unexpected error occurred",
                status: "ERROR",
            };
        } finally {
            setPitch("");
        }
    }



    return (
        <form
            action={formAction}
            className='startup-form'
        >
            {/* title */}
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />
                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            {/* description */}
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />
                {errors.description &&
                    <p className="startup-form_error">{errors.description}</p>}
            </div>
            {/* category */}
            <div>
                <label htmlFor="category" className="startup-form_label">category</label>
                <Input
                    id="category"
                    name="category"
                    type="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup category (e.g. Health, Tech, Education, etc.)"
                />
                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>
            {/* Image */}
            <div>
                <label htmlFor="link" className="startup-form_label">Image</label>
                <div className="flex items-center gap-2 mb-2">
                    <Button
                        type="button"
                        size="sm"
                        variant={inputMode === 'upload' ? 'default' : 'outline'}
                        onClick={() => setInputMode('upload')}
                    >
                        Upload
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        variant={inputMode === 'url' ? 'default' : 'outline'}
                        onClick={() => setInputMode('url')}
                    >
                        Paste URL
                    </Button>
                </div>

                {inputMode === 'upload' && (
                    <Input
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="startup-form_input"
                    />
                )}

                {inputMode === 'url' && (
                    <div className="flex items-center gap-2">
                        <Input
                            id="link"
                            name="link-input"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="startup-form_input flex-1"
                            value={imageUrl ?? ''}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                )}

                {uploading && inputMode === 'upload' && (
                    <p className="text-sm text-gray-500">Uploading...</p>
                )}

                {imageUrl && (
                    <div className="mt-3 rounded-xl border bg-muted/30 p-3">
                        <div className="flex items-start gap-3">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="h-20 w-20 rounded-lg object-cover border"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="text-sm text-muted-foreground truncate">{imageUrl}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <Button type="button" variant="secondary" asChild>
                                        <a href={imageUrl} target="_blank" rel="noreferrer">
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            Preview
                                        </a>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => setImageUrl(null)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" name="link" value={imageUrl} />
                    </div>
                )}
                {errors.link && <p className="startup-form_error">{errors.link}</p>}
            </div>
            {/* Pitch */}
            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor
                    id="pitch"
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    preview="edit"
                    height={300}
                    style={{ borderRadius: "20px", overflow: "hidden" }}
                    textareaProps={
                        {
                            placeholder: "Please descripe your idea and what problem it solves",

                        }
                    }
                    previewOptions={
                        { disallowedElements: ["style"] }
                    }
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
            </div>
            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit your Pitch"}
                <Send className='size-6 m-l-2' />
            </Button>
        </form>
    )
}

export default StartupForm