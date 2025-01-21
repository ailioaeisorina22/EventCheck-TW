import User from "../entities/User.js";
import AttendanceList from "../entities/AttendanceList.js";
import Event from "../entities/Event.js";

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return { success: true, users: users };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id);
    return { success: true, user: user };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

async function createUser(user) {
  try {
    const userCreated = await User.create(user);
    return { success: true, user: userCreated };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}
async function getUserByEmail(email) {
  try {
    const users = await User.findAll({
      where: {
        UserEmail: email,
      },
    });
    return { success: true, users: users };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}
//selectam toti userii care participa la un ev
async function getUsersForEvent(eventId) {
  try {
    const event = await Event.findByPk(eventId, {
      include: [ //vrem ca interogarea includa datele despre utilizatorii care sunt asoc cu acest ev
        {
          model: User,
          as: "Users", //aliasul pt asocierea def dintre User si Event
        },
      ],
    });

    const users = event.Users;

    return { success: true, users: users };
  } catch (error) {
    console.error("Eroare ", error);
    return {
      success: false,
    };
  }
}

export {
  getAllUsers,
  getUserById,
  createUser,
  getUserByEmail,
  getUsersForEvent,
};
