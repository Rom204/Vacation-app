import { PrismaClient } from '@prisma/client'
import { VacationModel } from '../Models/vacation_model';

const prisma = new PrismaClient()

export const create = async () => {
  // ... you will write your Prisma Client queries here
  const data = {
    information: "just some data",
    location: "just some data",
    imageName: "just some data",
    from_date: new Date(),
    to_date: new Date(),
    price: 0
  }
  try {
    const res = await prisma.vacations.create({
      data: data,

    });
    
    console.log(res);
  } catch (err) {
    console.log(err)
  } finally {
      async () => {
        await prisma.$disconnect();
      }
  }
}
// create();
export const createData = async () => {
  // ... you will write your Prisma Client queries here
  
  try {
    const res = await prisma.user.create({
      data : {
        firstName: 'John',
        lastName: 'John Smisth',
        username: "shir3",
      }
    });
    
    console.log(res);
  } catch (err) {
    console.log(err)
  } finally {
      async () => {
        await prisma.$disconnect();
      }
  }
  
}
// createData();


export const getData = async () => {
  try {
    const res = await prisma.vacations.findMany();
    console.log(res);
    return res
} catch (err) {
  console.log(err);
} finally {
  async () => {
    await prisma.$disconnect();
  };
}
}
export const getData2 = async () => {
  try {
    const res = await prisma.user.findMany({
      include: {
        
      }
    });
    console.log(res);
    return res
} catch (err) {
  console.log(err);
} finally {
  async () => {
    await prisma.$disconnect();
  };
}
}
// getData();
// getData2();


async function addFollow(userId, vacationId) {
  const newFollow = await prisma.follows.create({
    data: {
      user: {
        connect: { id: userId },
      },
      vacations: {
        connect: { id: vacationId },
      }
    },
  })

  console.log(`New follow record created: ${newFollow.id}`)
}

// addFollow(3, 1)


async function deleteFollow(followId) {
  const deletedFollow = await prisma.follows.deleteMany({
    where: { userId: followId },
  })

  console.log(`Follow record deleted: ${deletedFollow}`)
}
// deleteFollow(1)

const followers = async () => { 
  try {
    const res = await prisma.follows.findMany({
      where: {
        vacationId: 3
      },
      include :{ 
        user : {
          select: {
            id: true,
            username: true
          }
        }
      }
    })
    const final = res.map(follow => follow.userId);
    console.log(final);
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect();
  }
}

followers();