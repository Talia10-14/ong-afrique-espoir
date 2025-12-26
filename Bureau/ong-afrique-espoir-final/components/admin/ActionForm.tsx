"use client";

import { useState } from "react";
import { createAction, deleteAction, updateAction } from "@/app/actions/actions";
import { Button } from "@/components/ui/Button";
import { Trash2, Plus, Edit2, Leaf, Users, Laptop, Heart, Globe, Sun, X, Calendar, MapPin, Upload, Search } from "lucide-react";
import { Action } from "@prisma/client";
import * as LucideIcons from "lucide-react";
import Image from "next/image";

const ICONS = [
  { name: "Leaf", component: Leaf },
  { name: "Users", component: Users },
  { name: "Laptop", component: Laptop },
  { name: "Heart", component: Heart },
  { name: "Globe", component: Globe },
  { name: "Sun", component: Sun },
];

const COLORS = ["green", "blue", "yellow", "red", "purple"];

export function ActionForm({ actions }: { actions: Action[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette action ?")) {
      await deleteAction(id);
    }
  };

  const handleEdit = (action: Action) => {
    setEditingAction(action);
    setPreviewImage(action.image);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingAction(null);
    setPreviewImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    }
  };

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (action.category && action.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-gray-800">Actions en cours</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-terra-green"
            />
          </div>
          {!isAdding && (
            <Button onClick={() => setIsAdding(true)} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          )}
        </div>
      </div>

      {isAdding && (
        <div className="rounded-lg border bg-gray-50 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-700">
              {editingAction ? "Modifier l'Action" : "Nouvelle Action"}
            </h3>
            <button onClick={closeForm} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form action={async (formData) => {
            let res;
            if (editingAction) {
              // Preserve existing image path if no new file is uploaded
              if (!formData.get("imageFile") && editingAction.image) {
                formData.set("image", editingAction.image);
              }
              res = await updateAction(editingAction.id, null, formData);
            } else {
              res = await createAction(null, formData);
            }
            
            if (res.success) {
              closeForm();
            } else {
              alert(res.message);
            }
          }} className="space-y-4">
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Titre</label>
                <input 
                  name="title" 
                  required 
                  defaultValue={editingAction?.title}
                  className="w-full rounded border p-2" 
                  placeholder="Ex: Reboisement" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Catégorie</label>
                <input 
                  name="category" 
                  defaultValue={editingAction?.category || ""}
                  className="w-full rounded border p-2" 
                  placeholder="Ex: Environnement" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea 
                name="description" 
                required 
                defaultValue={editingAction?.description}
                className="w-full rounded border p-2" 
                rows={3} 
                placeholder="Détails..." 
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Date / Statut</label>
                <input 
                  name="date" 
                  defaultValue={editingAction?.date || ""}
                  className="w-full rounded border p-2" 
                  placeholder="Ex: En cours, Juin 2025" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Lieu</label>
                <input 
                  name="location" 
                  defaultValue={editingAction?.location || ""}
                  className="w-full rounded border p-2" 
                  placeholder="Ex: Nord Bénin" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Image</label>
              <div className="mt-1 flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg border bg-gray-100">
                  {previewImage ? (
                    <Image src={previewImage} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <Upload className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <input 
                  type="file" 
                  name="imageFile" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-terra-green/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-terra-green hover:file:bg-terra-green/20"
                />
              </div>
              <input type="hidden" name="image" value={editingAction?.image || ""} />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium">Icône (Accueil)</label>
                <select 
                  name="icon" 
                  defaultValue={editingAction?.icon || "Leaf"}
                  className="w-full rounded border p-2"
                >
                  {ICONS.map((icon) => (
                    <option key={icon.name} value={icon.name}>{icon.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Couleur (Accueil)</label>
                <select 
                  name="color" 
                  defaultValue={editingAction?.color || "green"}
                  className="w-full rounded border p-2"
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={closeForm}>Annuler</Button>
              <Button type="submit">{editingAction ? "Mettre à jour" : "Enregistrer"}</Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredActions.map((action) => {
           // eslint-disable-next-line @typescript-eslint/no-explicit-any
           const IconComponent = (LucideIcons as any)[action.icon] || LucideIcons.Leaf;
           return (
            <div key={action.id} className={`relative rounded-lg border bg-white p-4 shadow-sm border-l-4 border-l-${action.color}-500`}>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-2">
                   <IconComponent className={`h-5 w-5 text-${action.color}-600`} />
                   <h4 className="font-bold text-gray-900">{action.title}</h4>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(action)} 
                    className="rounded p-1 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                    title="Modifier"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(action.id)} 
                    className="rounded p-1 text-red-500 hover:bg-red-50 hover:text-red-700"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{action.description}</p>
              
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                {action.category && <span className="rounded bg-gray-100 px-2 py-1">{action.category}</span>}
                {action.date && <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1"><Calendar className="h-3 w-3"/>{action.date}</span>}
                {action.location && <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1"><MapPin className="h-3 w-3"/>{action.location}</span>}
              </div>
            </div>
          );
        })}
        {filteredActions.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            {searchTerm ? "Aucun résultat trouvé." : "Aucune action enregistrée."}
          </p>
        )}
      </div>
    </div>
  );
}
