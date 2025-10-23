"use client"

import { useState } from "react";
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

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
        </form>
    )
}

export default StartupForm