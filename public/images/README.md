# Imágenes de productos

Esta carpeta guarda las imágenes **públicas** de los buzos que ve el cliente.

## Convención

Los archivos deben llamarse exactamente:

- `buzo-1.jpg` → Buzo Nocturno
- `buzo-2.jpg` → Buzo Classic Hood
- `buzo-3.jpg` → Buzo Urban Elite
- `buzo-4.jpg` → Buzo Street Vision
- `buzo-5.jpg` → Buzo Minimal Code
- `buzo-6.jpg` → Buzo Urban Flow

## Cómo actualizar

1. Entrá a `/admin-secreto` en el sitio (solo el dueño sabe la URL).
2. Subí las imágenes nuevas desde el escritorio.
3. Descargá el paquete ZIP que genera el admin panel.
4. Descomprimí dentro de `public/images/`, reemplazando los archivos existentes.
5. `git add public/images/` → `git commit` → `git push`.
6. Vercel redespliega automático y todos los clientes ven las imágenes nuevas.

## Fallback

Si un archivo falta, la landing usa una imagen placeholder de Pexels (ver `src/data/products.ts`).
