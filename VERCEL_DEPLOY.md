# UrbanSwag — Deploy a Vercel (5 pasos, ~10 min)

**Pre-requisito**: Tenés que haber completado el setup de Supabase primero (ver `SUPABASE_SETUP.md`). Las claves de Supabase se cargan en Vercel como variables de entorno.

## 1. Empujar el código al repo

Asegurate que tu rama `main` esté pusheada con los últimos cambios:

```bash
cd /home/penerico/albertproject/albertproject
git add -A
git commit -m "feat: integración Supabase + admin panel con auth"
git push origin main
```

## 2. Crear cuenta en Vercel

1. Entrá a **https://vercel.com/signup**.
2. Click **"Continue with GitHub"** — usá la misma cuenta de GitHub donde vive el repo.
3. Autorizá acceso a tus repositorios cuando te lo pida.

## 3. Importar el proyecto

1. Dashboard de Vercel → **"Add New..."** → **"Project"**.
2. En la lista de repos encontrás `albertproject` → click **"Import"**.
3. Vercel detecta automáticamente que es un proyecto **Vite**. No toques la config de build.
4. **NO HAGAS DEPLOY TODAVÍA** — primero tenés que cargar las env vars (paso 4).

## 4. Cargar las variables de entorno (CRÍTICO)

En la misma pantalla de "Configure Project", antes de hacer deploy:

1. Expandí **"Environment Variables"**.
2. Agregá estas dos variables:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxx.supabase.co` (la URL de tu proyecto Supabase) |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` (la anon key) |

3. Para cada una, tildá que aplique a **Production**, **Preview** Y **Development**.
4. Ahora sí, click **"Deploy"**.

Vercel va a buildar (~1 min) y te da una URL tipo `albertproject-xxxxx.vercel.app`.

## 5. Verificar que funciona

1. Abrí tu URL de Vercel (ej. `https://albertproject-xxxxx.vercel.app`).
2. Deberías ver la landing con los 6 buzos cargados desde Supabase.
3. Navegá a `/admin-urbanswag` (la URL secreta).
4. Logueate con el admin que creaste en Supabase.
5. Cambiá un precio y clic "Guardar".
6. Volvé a `/` — el precio nuevo **tiene que aparecer**.

---

## Domino personalizado (opcional, cuando el cliente lo quiera)

Vercel → Project → **Settings → Domains** → **Add** → tipeá tu dominio (ej. `urbanswag.co`).

Vercel te da los registros DNS a configurar en tu proveedor (Namecheap, GoDaddy, etc.). Propagación: 5 min a 24 h.

## Auto-deploy continuo

Desde ahora, cada vez que hagas `git push origin main` → **Vercel redespliega automático** en ~1 min. Sin intervención tuya.

Para **cambios de imagen/precio** que hace el dueño vía admin panel → **NO requiere redeploy**. Supabase guarda los datos, la landing los lee al cargar la página. Vercel solo redespliega si cambia el código.

---

## Troubleshooting

| Síntoma | Causa | Solución |
|---------|-------|----------|
| Landing carga sin productos | Env vars no cargadas | Settings → Environment Variables → verificar + **Redeploy** |
| 404 al entrar a `/admin-urbanswag` directo | SPA fallback no aplicado | Verificá que `vercel.json` esté en la raíz del repo |
| "Invalid login credentials" en el admin | Usuario no existe en Supabase | Authentication → Users → Add user |
| "Failed to fetch" en el admin al guardar | CORS o proyecto Supabase pausado | Entrá al dashboard de Supabase — si está pausado se reactiva al hacer click |
| Imagen subida no se ve | Bucket `product-images` no es público | Supabase → Storage → `product-images` → Settings → "Public bucket" ON |

## ¿Por qué Vercel y no otro?

- **Free tier generoso**: 100 GB bandwidth/mes, builds ilimitados, domain gratis `.vercel.app`
- **Auto-deploy** desde git push — cero clicks
- **Preview URLs** por cada PR → cliente puede revisar antes de mergear
- **Edge CDN global** → carga rápida desde Colombia
- **Integración nativa con Vite** — sin configuración
- **Sin tarjeta de crédito** para el free tier

## Costo esperado

$0/mes. Para esta app (tráfico esperado bajo, imágenes livianas), ni siquiera te vas a acercar a los límites del free tier. Lo vas a ver literalmente en el dashboard.
