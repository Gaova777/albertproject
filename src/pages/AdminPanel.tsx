import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Save,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ImageIcon,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import {
  Product,
  updateProduct,
  uploadProductImage,
} from "../lib/products";

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface DraftState {
  name: string;
  price: string;
  material: string;
  imageFile: File | null;
  imagePreview: string | null;
}

const buildDraft = (p: Product): DraftState => ({
  name: p.name,
  price: p.price,
  material: p.material,
  imageFile: null,
  imagePreview: null,
});

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// -----------------------------------------------------------------------------
// LOGIN
// -----------------------------------------------------------------------------
const LoginCard: React.FC<{
  onSubmit: (email: string, password: string) => Promise<string | null>;
  configured: boolean;
}> = ({ onSubmit, configured }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const result = await onSubmit(email, password);
    setLoading(false);
    if (result) setErr(result);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-stone-600 hover:text-stone-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al sitio
        </Link>

        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
          UrbanSwag · Admin
        </p>
        <h1 className="mb-10 text-4xl font-light tracking-tight md:text-5xl">
          Iniciar <span className="italic font-serif">sesión.</span>
        </h1>

        {!configured && (
          <div className="mb-6 border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Supabase no configurado.</strong> Creá <code>.env.local</code>{" "}
            y reiniciá el dev server (ver SUPABASE_SETUP.md).
          </div>
        )}

        <form onSubmit={handle} className="space-y-5">
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!configured}
              autoComplete="email"
              className="w-full border border-stone-300 bg-white px-4 py-3 text-sm focus:border-stone-950 focus:outline-none disabled:bg-stone-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-stone-500">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!configured}
              autoComplete="current-password"
              className="w-full border border-stone-300 bg-white px-4 py-3 text-sm focus:border-stone-950 focus:outline-none disabled:bg-stone-100"
            />
          </div>

          {err && (
            <div className="flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-sm text-red-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{err}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !configured}
            className="w-full bg-stone-950 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// PRODUCT EDITOR CARD
// -----------------------------------------------------------------------------
const ProductEditor: React.FC<{
  product: Product;
  draft: DraftState;
  onChange: (patch: Partial<DraftState>) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
  onFile: (file: File) => void;
}> = ({ product, draft, onChange, onSave, saving, dirty, onFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = draft.imagePreview ?? product.image_url;

  return (
    <article
      className={`border bg-white p-5 transition-colors ${
        dirty ? "border-stone-950" : "border-stone-200"
      }`}
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-stone-100">
        {preview ? (
          <img
            src={preview}
            alt={draft.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}
        {dirty && (
          <span className="absolute left-3 top-3 rounded-full bg-stone-950 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white">
            Sin guardar
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mb-4 inline-flex w-full items-center justify-center gap-2 border border-stone-300 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-700 transition-colors hover:border-stone-950 hover:text-stone-950"
      >
        <Upload className="h-3.5 w-3.5" />
        {draft.imageFile ? "Cambiar imagen" : "Subir imagen"}
      </button>

      {draft.imageFile && (
        <p className="mb-4 truncate text-xs text-stone-600">
          📁 {draft.imageFile.name} · {formatSize(draft.imageFile.size)}
        </p>
      )}

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Nombre
          </label>
          <input
            type="text"
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-950 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Precio
          </label>
          <input
            type="text"
            value={draft.price}
            onChange={(e) => onChange({ price: e.target.value })}
            className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-950 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
            Material
          </label>
          <input
            type="text"
            value={draft.material}
            onChange={(e) => onChange({ material: e.target.value })}
            className="w-full border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-950 focus:outline-none"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={!dirty || saving}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-stone-950 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Save className="h-3.5 w-3.5" />
        )}
        Guardar
      </button>
    </article>
  );
};

// -----------------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------------
const AdminPanel: React.FC = () => {
  const { session, loading: authLoading, signIn, signOut, configured } =
    useAuth();
  const { products, loading: productsLoading, error, reload } = useProducts();

  const [drafts, setDrafts] = useState<Record<number, DraftState>>({});
  const [savingId, setSavingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{
    kind: "success" | "error";
    msg: string;
  } | null>(null);

  useEffect(() => {
    if (products.length) {
      setDrafts((prev) => {
        const next: Record<number, DraftState> = {};
        products.forEach((p) => {
          next[p.id] = prev[p.id] ?? buildDraft(p);
        });
        return next;
      });
    }
  }, [products]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const showToast = (kind: "success" | "error", msg: string) =>
    setToast({ kind, msg });

  const isDirty = (p: Product): boolean => {
    const d = drafts[p.id];
    if (!d) return false;
    return (
      d.name !== p.name ||
      d.price !== p.price ||
      d.material !== p.material ||
      d.imageFile !== null
    );
  };

  const handleFile = (productId: number, file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      showToast("error", `Formato inválido. Usá JPG, PNG o WebP.`);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      showToast("error", `Imagen demasiado pesada (máx ${MAX_SIZE_MB} MB).`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDrafts((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          imageFile: file,
          imagePreview: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveProduct = async (product: Product) => {
    const draft = drafts[product.id];
    if (!draft) return;

    setSavingId(product.id);
    try {
      let imageUrl = product.image_url;
      if (draft.imageFile) {
        imageUrl = await uploadProductImage(product.slug, draft.imageFile);
      }

      await updateProduct(product.id, {
        name: draft.name,
        price: draft.price,
        material: draft.material,
        image_url: imageUrl,
      });

      setDrafts((prev) => ({
        ...prev,
        [product.id]: {
          ...prev[product.id],
          imageFile: null,
          imagePreview: null,
        },
      }));

      await reload();
      showToast("success", `"${draft.name}" guardado.`);
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err instanceof Error ? err.message : "Error guardando."
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleSignIn = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    const err = await signIn(email, password);
    return err ? err.message : null;
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <Loader2 className="h-6 w-6 animate-spin text-stone-600" />
      </div>
    );
  }

  if (!session) {
    return <LoginCard onSubmit={handleSignIn} configured={configured} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-950">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-stone-600 hover:text-stone-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-[11px] uppercase tracking-[0.25em] text-stone-500 sm:inline">
              {session.user.email}
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 border border-stone-300 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-700 transition-colors hover:border-stone-950 hover:text-stone-950"
            >
              <LogOut className="h-3.5 w-3.5" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-stone-500">
            Panel Administrador
          </p>
          <h1 className="text-4xl font-light tracking-tight md:text-6xl">
            Gestionar <span className="italic font-serif">colección.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600">
            Editá nombre, precio, material e imagen de cada buzo. Clic en{" "}
            <strong className="text-stone-950">Guardar</strong> y los cambios se
            reflejan en la landing al instante.
          </p>
        </div>

        {error && (
          <div className="mb-8 border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <strong>Error cargando productos:</strong> {error}
          </div>
        )}

        {productsLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-stone-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const draft = drafts[product.id];
              if (!draft) return null;
              return (
                <ProductEditor
                  key={product.id}
                  product={product}
                  draft={draft}
                  dirty={isDirty(product)}
                  saving={savingId === product.id}
                  onChange={(patch) =>
                    setDrafts((prev) => ({
                      ...prev,
                      [product.id]: { ...prev[product.id], ...patch },
                    }))
                  }
                  onFile={(file) => handleFile(product.id, file)}
                  onSave={() => saveProduct(product)}
                />
              );
            })}
          </div>
        )}
      </main>

      {toast && (
        <div
          className={`fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-white px-6 py-3 text-sm shadow-lg ${
            toast.kind === "success"
              ? "border-emerald-200 text-emerald-900"
              : "border-red-200 text-red-900"
          }`}
        >
          {toast.kind === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-600" />
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
