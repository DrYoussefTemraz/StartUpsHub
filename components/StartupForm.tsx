"use client"

import { useState } from "react";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("**Hello world!!!**");
    const isPending = false;

    return (
        <form
            action={() => { }}
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