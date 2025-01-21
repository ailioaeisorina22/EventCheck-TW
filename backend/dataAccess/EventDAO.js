import Event from "../entities/Event.js";
import User from "../entities/User.js";

/*async function getAllEvents() {
  try {
    const events = await Event.findAll();
    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}*/

async function getAllEvents(req, res) {
  try {
    const events = await Event.findAll();

    // Verificăm și actualizăm starea pentru fiecare eveniment
    const updatedEvents = await Promise.all(
      events.map((event) => checkAndUpdateEventStatus(event))
    );

    return res.status(200).json({ success: true, events: updatedEvents });
  } catch (error) {
    console.error("Eroare la obținerea evenimentelor:", error);
    return res.status(500).json({ success: false, message: "Eroare la server." });
  }
}


/*async function getEventById(id) {
  try {
    const event = await Event.findByPk(id);
    return { success: true, event: event };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}*/

async function getEventById(req, res) {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: "Evenimentul nu există." });
    }

    const updatedEvent = await checkAndUpdateEventStatus(event);

    return res.status(200).json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error("Eroare la obținerea evenimentului:", error);
    return res.status(500).json({ success: false, message: "Eroare la server." });
  }
}

async function createEvent(event) {
  try {
    console.log("Eveniment de creat:", event);

    const createdEvent = await Event.create(event);
    console.log("Eveniment creat cu succes:", createdEvent);

    return { success: true, event: createdEvent };
  } catch (error) {
    console.error("Eroare la crearea evenimentului:", error.message);
    return { success: false, message: error.message };
  }
}

//select pe toate eventurile create de un anumit user
async function getEventsByUserId(userId) {
  try {
    const events = await Event.findAll({
      where: {
        UserId: userId,
      },
    });
    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false };
  }
}

//select pe toate eventurile care apartin de un group
async function getEventsByGroup(groupId) {
  try {
    const events = await Event.findAll({
      where: {
        GroupId: groupId,
      },
    });

    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

//update pentru enumul din event(OPEN/CLOSED)
async function updateEventStatus(status, eventId) {
  try {
    const updatedEvent = await Event.update(
      { EventStatus: status },
      { where: { EventId: eventId } }
    );
    if (updatedEvent[0] === 1) {
      return { success: true, message: "Actualizare cu succes." };
    } else {
      return { success: false, message: "Evenimentul nu a fost găsit sau nu a fost actualizat." };
    }
  } catch (error) {
    console.error("Eroare la actualizare:", error);
    return { success: false, message: "Eroare la actualizare." };
  }
}

//actualizare??
async function checkAndUpdateEventStatus(event) {
  const now = new Date();

  if (now >= event.eventDateStart && now <= event.eventDateEnd) {
    if (event.EventStatus !== "OPEN") {
      // Actualizăm în baza de date și schimbăm local
      await Event.update({ EventStatus: "OPEN" }, { where: { EventId: event.EventId } });
      event.EventStatus = "OPEN";
    }
  } else {
    if (event.EventStatus !== "CLOSED") {
      await Event.update({ EventStatus: "CLOSED" }, { where: { EventId: event.EventId } });
      event.EventStatus = "CLOSED";
    }
  }

  return event; // Returnează evenimentul cu starea actualizată
}

async function deleteEventById(eventId) {
  try {
    const event = await Event.destroy({
      where: {
        EventId: eventId,
      },
    });
    if(event>0)
    return { success: true};
  else return {success:false}
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}


//select pentru toate evenimentele la care participa un user
async function getEventsForUser(id) {
  try {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Event,
          as: "Events", // asociere
        },
      ],
    });

    const events = user.Events;

    return { success: true, events:events };
  } catch (error) {
    console.error("Eroare ", error);
    return {
      success: false,
    };
  }
}
async function getEventsByAccess(code) {
  try {
    const events = await Event.findAll({
      where: {
        EventCodAccess: code,
      },
    });

    return { success: true, events: events };
  } catch (error) {
    console.error("Eroare :", error);
    return { success: false};
  }
}

export {
  getAllEvents,
  getEventById,
  createEvent,
  getEventsByUserId,
  getEventsByGroup,
  updateEventStatus,
  deleteEventById,
  getEventsForUser,
  getEventsByAccess
};
