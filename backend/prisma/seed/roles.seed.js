export const seedRoles =  async (prisma) => {

    await prisma.roles.createMany({

        data: [

            {
                name: "admin",
                description: "Administrator"
            },

            {
                name: "user",
                description: "Normal user"
            },

            {
                name: "business",
                description: "Business owner"
            }

        ],

        skipDuplicates: true

    });

}

