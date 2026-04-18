# UrbanSwag — Setup de Supabase (5 pasos, ~10 min)

Este documento te lleva de **cero a panel admin funcional** con Supabase.

## 1. Crear el proyecto Supabase

1. Entrá a **https://supabase.com** y creá una cuenta (con GitHub o Google).
2. Click en **"New project"**.
3. Configurá:
   - **Name**: `urbanswag`
   - **Database Password**: generá una fuerte y **GUARDALA** — te la van a volver a pedir si querés acceso directo a la DB.
   - **Region**: elegí la más cercana (South America — São Paulo si estás en Colombia).
   - **Pricing plan**: **Free**.
4. Click **"Create new project"** y esperá ~2 minutos a que provisionen.

## 2. Correr el SQL de setup

1. En el dashboard del proyecto, menú izquierdo → **SQL Editor** → **"+ New query"**.
2. Abrí el archivo `supabase/setup.sql` de este repo.
3. **Copiá TODO el contenido** y pegalo en el editor.
4. Click **"Run"** (o `Ctrl+Enter`).
5. Deberías ver: `Success. No rows returned.` — todo OK.
6. Verificá corriendo: `SELECT * FROM public.products ORDER BY sort_order;` — tienen que aparecer los 6 buzos.

Este script crea:
- La tabla `products` con los 6 buzos de seed
- Políticas de RLS (lectura pública, escritura solo autenticado)
- Las policies del bucket `product-images` (lectura pública, escritura solo autenticado)

### 2.1 Crear el bucket manualmente (30 segundos)

El SQL no puede crear buckets de Storage en versiones recientes de Supabase (bloqueo por diseño). Hacelo por la UI:

1. Menú izquierdo → **Storage** → **"New bucket"**
2. **Name**: `product-images` (EXACTO, con el guion)
3. **Public bucket**: ✅ **ON**
4. Click **"Create bucket"**

Las policies que corriste en el SQL se aplican automáticamente al bucket apenas existe.

## 3. Crear el usuario admin (el dueño de la tienda)

1. Menú izquierdo → **Authentication** → **Users** → **"Add user"** → **"Create new user"**.
2. Email: el del dueño (ej: `dueno@urbanswag.com`).
3. Password: una fuerte. **Pasásela al dueño por un canal seguro**, NO por el repo.
4. **Desmarcá** "Auto Confirm User" si querés que confirme por mail, o **marcalo** si querés loguear directo.
5. Click **"Create user"**.

> **Importante**: Supabase por defecto permite signup público. Para esta app queremos que **SOLO** el admin pueda loguear — los clientes no necesitan cuenta.
>
> **Opcional** (recomendado): en **Authentication → Providers → Email**, desmarcá **"Enable email signups"**. Así nadie puede crear cuenta solo, solo vos desde el dashboard.

## 4. Copiar las claves al proyecto

1. Menú izquierdo → **Project Settings** (⚙️) → **API**.
2. Copiá:
   - **Project URL** (algo como `https://xxxxxxxxxx.supabase.co`)
   - **Project API keys** → **`anon` `public`** (token largo que empieza con `eyJ...`)
3. En la raíz del proyecto, creá un archivo nuevo llamado `.env.local` con este contenido (reemplazando los valores):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Comando rápido en la terminal:
```bash
cd /home/penerico/albertproject/albertproject
cat > .env.local <<'EOF'
VITE_SUPABASE_URL=PEGA_ACA_TU_URL
VITE_SUPABASE_ANON_KEY=PEGA_ACA_TU_ANON_KEY
EOF
```

Luego abrilo con tu editor y reemplazá los placeholders.

> La clave `anon` es **segura exponerla al frontend** — las policies de RLS que creamos son las que realmente protegen los datos. Alguien con esa clave **no** puede modificar productos sin estar logueado.

## 5. Levantar el proyecto

```bash
pnpm install          # instala @supabase/supabase-js
pnpm dev
```

Abrí:
- **Landing**: http://localhost:5173/ — ve los 6 buzos desde Supabase
- **Admin**: http://localhost:5173/admin-urbanswag — login con el mail/clave del paso 3

---

## Troubleshooting

| Error | Causa | Solución |
|-------|-------|----------|
| "Missing env vars VITE_SUPABASE_*" | No creaste `.env.local` o falta alguna clave | Revisá el paso 4 |
| Landing vacía, sin productos | El SQL no se corrió bien | Volvé al paso 2, verificá con el `SELECT` |
| "Invalid login credentials" | Usuario mal creado | Volvé al paso 3 |
| Imágenes no cargan tras subirlas | El bucket no es público | Verificá: Storage → `product-images` → Settings → "Public bucket" ON |
| "new row violates row-level security" | Policy mal configurada | Re-corré el SQL completo (es idempotente) |

## ¿Cómo le cambio la clave al admin?

1. Supabase → Authentication → Users → seleccioná el usuario → **"Send password reset"** (le llega mail al dueño) o **"..." → "Delete user"** y creá uno nuevo.

## ¿Qué pasa si el proyecto queda 7 días sin uso?

Supabase pausa el proyecto free. Los clientes verían la landing lenta la primera vez. **Se despierta automático en 2–3 segundos** al primer request. Si querés evitarlo, pagás $25/mes (Pro plan) o podés agregar un cron que le pegue cada 6 días.
