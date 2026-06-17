// prisma/seed/categories.seed.js

export const seedCategorias = async (prisma) => {
console.log('🌱 Iniciando el poblamiento de categorías...');

const rawCategories = [
{ name: 'Farmacias', icon: 'FaPills' },
{ name: 'Ferreterías', icon: 'FaHammer' },
{ name: 'Supermercados y Colmados', icon: 'FaStore' },
{ name: 'Electricistas', icon: 'FaPlug' },
{ name: 'Plomeros', icon: 'FaWrench' },
{ name: 'Restaurantes y Cafeterías', icon: 'FaUtensils' },
{ name: 'Salones de Belleza y Barberías', icon: 'FaCut' },
{ name: 'Talleres Mecánicos', icon: 'FaCarMechanic' },
{ name: 'Clínicas y Centros Médicos', icon: 'FaStethoscope' },
{ name: 'Servicios de Limpieza', icon: 'FaBroom' }
];

// Mapeamos los datos para generar el slug automáticamente y poner is_active en 1 (true)
const categorias = rawCategories.map(cat => ({
name: cat.name,
icon: cat.icon,
slug: cat.name
    .toLowerCase()
    .normalize("NFD") // Elimina acentos (ej: Ferreterías -> Ferreterias)
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales externos
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
}));

// IMPORTANTE: Asegúrate de que en tu schema.prisma tu modelo se llame 'category' o 'Category'
// Si en tu esquema está en mayúscula, cambia 'prisma.category' por 'prisma.Category'
await prisma.categories.createMany({
data: categorias,
skipDuplicates: true,
});

console.log('✅ ¡Categorías insertadas correctamente!');
}