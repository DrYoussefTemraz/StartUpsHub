"use client"

import { useActionState, useState } from "react";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner"
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("**Hello world!!!**");
    const router = useRouter();
    // useActionState is a Hook that allows you to update state based on the result of a form action.
    // 1- Action function
    const handleFormSubmit = async (prevState: any, formData: FormData,) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                link: formData.get('link') as string,
                pitch,
            }
            await formSchema.parseAsync(formValues);
            // console.log(formValues)
            const result = await createPitch(prevState, formData, pitch)
            console.log(result._id)
            if(result.status === 'Success'){
                toast.success(
            "Success",   
                    {description: "Startup created successfully",}
                )
                router.push(`/startup/${result._id}`);
            }
            return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>)
                toast.error(
                    "Validation Error",
                    { description: "Please check the form for errors", }
                )
                return { ...prevState, error: 'Validation failed', status: 'Error' }
            }
        }
        toast.error(
            "Validation Error",
            { description: "Please check the form for errors", }
        )
        return { ...prevState, error: 'unexpected error has occured', status: 'Error' }
    }

    const [state, formAction, isPending] = useActionState(
        handleFormSubmit,
        { error: '', status: 'Initial' },

    );



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
                <label htmlFor="link" className="startup-form_label">Image URL</label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image Url"
                />
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