import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { updateMyProfileRequest, changePasswordRequest } from "../../api/userApi";
import { toFormData, extractFieldErrors, resolveUploadUrl } from "../../utils/media";

import { PageHeader, Input, Field, Button } from "../../components/form";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import { roleLabel } from "../../utils/roles";

export default function Profile() {
  const { user, setUser, checkAuth } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.phone || "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      const formData = toFormData(form, { profile_photo: photo });
      const response = await updateMyProfileRequest(formData);
      setUser(response.data.data);
      toast.success("Perfil actualizado.");
      setPhoto(null);
      setPhotoPreview(null);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSavingPassword(true);

    try {
      await changePasswordRequest(passwordForm);
      toast.success("Contrasena actualizada correctamente.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSavingPassword(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setPhoto(file || null);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader eyebrow="Cuenta" title="Mi perfil" description="Administra tu informacion personal." />

      <div className="card-surface p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={photoPreview || user?.profile_photo}
            name={fullName || user?.email}
            size="h-16 w-16"
          />
          <div>
            <p className="font-semibold text-ink-900">{fullName || "Sin nombre"}</p>
            <p className="text-sm text-ink-500">{user?.email}</p>
            <Badge variant="brand" >{roleLabel(user?.role?.name)}</Badge>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <Field label="Foto de perfil">
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFile}
              className="block w-full text-sm text-ink-500 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-700 hover:file:bg-brand-100"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre" required>
              <Input
                required
                minLength={2}
                value={form.first_name}
                onChange={(e) => setForm((p) => ({ ...p, first_name: e.target.value }))}
              />
            </Field>
            <Field label="Apellido" required>
              <Input
                required
                minLength={2}
                value={form.last_name}
                onChange={(e) => setForm((p) => ({ ...p, last_name: e.target.value }))}
              />
            </Field>
          </div>

          <Field label="Telefono">
            <Input
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="809-000-0000"
            />
          </Field>

          <div className="flex justify-end">
            <Button type="submit" loading={savingProfile}>Guardar cambios</Button>
          </div>
        </form>
      </div>

      <div className="card-surface p-6">
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">Cambiar contrasena</h2>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Field label="Contrasena actual" required>
            <Input
              type="password"
              required
              minLength={8}
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nueva contrasena" required>
              <Input
                type="password"
                required
                minLength={8}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
              />
            </Field>
            <Field label="Confirmar contrasena" required>
              <Input
                type="password"
                required
                minLength={8}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
              />
            </Field>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="secondary" loading={savingPassword}>Actualizar contrasena</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
