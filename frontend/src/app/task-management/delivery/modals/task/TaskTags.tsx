import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Tag, X } from "lucide-react"
import { useState } from "react"

interface TaskTagsProps {
    tags: string[]
    onTagsChange: (tags: string[]) => void
}

export function TaskTags({ tags, onTagsChange }: TaskTagsProps) {
    const [newTag, setNewTag] = useState("")

    const addTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            onTagsChange([...tags, newTag.trim()])
            setNewTag("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
        <motion.div className="space-y-2">
            <Label>Etiquetas</Label>
            <AnimatePresence>
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <motion.div
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Badge variant="secondary" className="flex items-center gap-1 hover-lift">
                                <Tag className="h-3 w-3" />
                                {tag}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => removeTag(tag)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </AnimatePresence>
            <div className="flex gap-2">
                <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Agregar etiqueta..."
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="button" variant="outline" size="sm" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}
