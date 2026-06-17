

export const seedSectores = async (prisma) => {
console.log('🌱 Iniciando el poblamiento de sectores de República Dominicana...');

const sectores = [
// --- DISTRITO NACIONAL ---
{ name: 'Piantini', city: 'Distrito Nacional' },
{ name: 'Naco', city: 'Distrito Nacional' },
{ name: 'Bella Vista', city: 'Distrito Nacional' },
{ name: 'Gazcue', city: 'Distrito Nacional' },
{ name: 'Zona Colonial', city: 'Distrito Nacional' },
{ name: 'Evaristo Morales', city: 'Distrito Nacional' },
{ name: 'Los Prados', city: 'Distrito Nacional' },
{ name: 'El Millón', city: 'Distrito Nacional' },
{ name: 'Mirador Sur', city: 'Distrito Nacional' },
{ name: 'Arroyo Hondo', city: 'Distrito Nacional' },
{ name: 'Cristo Rey', city: 'Distrito Nacional' },
{ name: 'Villa Juana', city: 'Distrito Nacional' },
{ name: 'Ensanche Luperón', city: 'Distrito Nacional' },

// --- SANTO DOMINGO ESTE ---
{ name: 'Alma Rosa I', city: 'Santo Domingo Este' },
{ name: 'Alma Rosa II', city: 'Santo Domingo Este' },
{ name: 'Ensanche Ozama', city: 'Santo Domingo Este' },
{ name: 'Lucerna', city: 'Santo Domingo Este' },
{ name: 'San Isidro', city: 'Santo Domingo Este' },
{ name: 'Los Mina', city: 'Santo Domingo Este' },
{ name: 'Villa Duarte', city: 'Santo Domingo Este' },
{ name: 'Los Tres Ojos', city: 'Santo Domingo Este' },

// --- SANTO DOMINGO OESTE ---
{ name: 'Herrera', city: 'Santo Domingo Oeste' },
{ name: 'Las Caobas', city: 'Santo Domingo Oeste' },
{ name: 'Alcarrizos', city: 'Santo Domingo Oeste' },
{ name: 'Manoguayabo', city: 'Santo Domingo Oeste' },

// --- SANTO DOMINGO NORTE ---
{ name: 'Villa Mella', city: 'Santo Domingo Norte' },
{ name: 'Sabana Perdida', city: 'Santo Domingo Norte' },
{ name: 'Guaricanos', city: 'Santo Domingo Norte' },

// --- SANTIAGO DE LOS CABALLEROS ---
{ name: 'Los Jardines Metropolitanos', city: 'Santiago' },
{ name: 'Villa Olga', city: 'Santiago' },
{ name: 'La Trinitaria', city: 'Santiago' },
{ name: 'Cerros de Gurabo', city: 'Santiago' },
{ name: 'Pueblo Nuevo', city: 'Santiago' },
{ name: 'Los Pepines', city: 'Santiago' },
{ name: 'Gurabo', city: 'Santiago' },
{ name: 'Cienfuegos', city: 'Santiago' },

// --- LA ROMANA ---
{ name: 'Buena Vista Norte', city: 'La Romana' },
{ name: 'Villa Verde', city: 'La Romana' },
{ name: 'San Carlos', city: 'La Romana' },

// --- SAN PEDRO DE MACORÍS ---
{ name: 'Barrio Lindo', city: 'San Pedro de Macorís' },
{ name: 'Placer Bonito', city: 'San Pedro de Macorís' },
{ name: 'Miramar', city: 'San Pedro de Macorís' },

// --- HIGÜEY / PUNTACANA ---
{ name: 'Bávaro', city: 'La Altagracia' },
{ name: 'Punta Cana', city: 'La Altagracia' },
{ name: 'El Cortecito', city: 'La Altagracia' },
{ name: 'Los Claveles', city: 'La Altagracia' },

// --- PUERTO PLATA ---
{ name: 'San Felipe', city: 'Puerto Plata' },
{ name: 'Sosúa', city: 'Puerto Plata' },
{ name: 'Cabarete', city: 'Puerto Plata' },

// --- SAN FRANCISCO DE MACORÍS ---
{ name: 'Urbanización Piña', city: 'San Francisco de Macorís' },
{ name: 'Pueblo Nuevo', city: 'San Francisco de Macorís' },
{ name: 'El Capacito', city: 'San Francisco de Macorís' },

// --- LA VEGA ---
{ name: 'El Vedado', city: 'La Vega' },
{ name: 'Villa Rosa', city: 'La Vega' },
{ name: 'Jarabacoa', city: 'La Vega' },
{ name: 'Constanza', city: 'La Vega' }
];

// IMPORTANTE: Asegúrate de que en tu schema.prisma tu modelo se llame 'sector' o 'Sector'
// Si se llama 'Sector', cambia 'prisma.sector' por 'prisma.sectors'
await prisma.sectors.createMany({
data: sectores,
skipDuplicates: true, 
});

console.log('✅ ¡Sectores insertados correctamente en la base de datos!');
}
