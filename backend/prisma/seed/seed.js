// prisma/seed/seed.js
import { PrismaClient } from '@prisma/client';
import { seedSectores } from './sectors.seed.js';
import { seedCategorias } from './categories.seed.js';
import { seedRoles} from './roles.seed.js';
const prisma = new PrismaClient();

async function main() {
console.log('🌱 Iniciando la inserción de datos...');

    await seedSectores(prisma);
    await seedCategorias(prisma);
    await seedRoles(prisma);

console.log('✅ ¡Datos insertados correctamente en la base de datos!');
}

main()
.catch((e) => {
console.error(e);
process.exit(1);
})
.finally(async () => {
await prisma.$disconnect();
});