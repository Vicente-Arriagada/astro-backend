
const datos = require('./data.json'); // Tu archivo con todos los productos juntos

// Configuración
const STRAPI_URL = 'http://localhost:1337/api/productos';
const API_TOKEN = 'b98da5fa2cea3f734e00cca9e2c9794ef450f5920782440931e95491aa709848ee67c2e963dd6a164079ff0bc7c71c38f8aef4482c55cd3cc65ea3828c3d456aadf758cffef9f5093bae552a8c584faa57b66ee5549465d09c511d3d912a77e4a683f0e5a0b8ba6727686b00d839bcfeebc9c68e74425ace6534ea32fd16b70a'; // Ver Paso 3

async function migrarDatos() {
    console.log(`🚀 Iniciando migración de ${datos.length} productos...`);

    for (const item of datos) {
        try {
            // 1. Unificar las especificaciones variables en un solo objeto "detalles"
            // Dependiendo del JSON, la info viene en 'especificaciones', 'caracteristicas', etc.
            const detallesUnificados = {
                ...item.especificaciones,
                ...item.caracteristicas,
                ...item.especificaciones_secundarias,
                ...item.caracteristicas_avanzadas,
                puertos: item.puertos || null,
                otros: item.otros || null,
                avanzados: item.avanzados || null
            };

            // 2. Preparar el objeto para Strapi
            const productoStrapi = {
                data: {
                    nombre: item.nombre,
                    slug: item.id, // Usamos tu ID original como slug
                    precio: item.precio,
                    categoria: item.categoria,
                    tipo: item.tipo || item.categoria, // Fallback si no tiene tipo
                    imagen_url: item.imagen_url,
                    detalles: detallesUnificados // Aquí guardamos toda la info técnica compleja
                }
            };

            // 3. Enviar a Strapi
            const respuesta = await fetch(STRAPI_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`
                },
                body: JSON.stringify(productoStrapi)
            });

            if (respuesta.ok) {
                console.log(`✅ Importado: ${item.nombre}`);
            } else {
                const error = await respuesta.json();
                console.error(`❌ Error en ${item.nombre}:`, JSON.stringify(error, null, 2));
            }

        } catch (error) {
            console.error(`💥 Error de red o script: ${error.message}`);
        }
    }
    console.log('🏁 Migración finalizada.');
}

migrarDatos();