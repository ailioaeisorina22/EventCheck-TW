import express from 'express';
import {getAllEvents,getEventById,createEvent,getEventsByUserId,getEventsByGroup,updateEventStatus,deleteEventById,getEventsForUser,getEventsByAccess} from '../dataAccess/EventDAO.js';

let eventRouter = express.Router();

eventRouter.route('/event').post(async (req, res) => {
    return res.status(201).json(await createEvent(req.body));
})
eventRouter.route('/events').get(async (req, res) => {
    return res.json(await getAllEvents());
})
eventRouter.route('/event/:id').get(async (req, res) => {
    return res.json(await getEventById(req.params.id));
})
eventRouter.route('/events/organizer/:userId').get(async (req, res) => {
    return res.json(await getEventsByUserId(req.params.userId));
})
eventRouter.route('/events/group/:groupId').get(async (req, res) => {
    return res.json(await getEventsByGroup(req.params.groupId));
})
eventRouter.route('/event/:eventId/status').put(async (req, res) => {
    return res.json(await updateEventStatus(req.body.status, req.params.eventId));
})
eventRouter.route('/event/:id').delete(async (req, res) => {
    return res.json(await deleteEventById(req.params.id));
})
eventRouter.route('/events/user/:id').get(async (req, res) => {
    return res.json(await getEventsForUser(req.params.id));
})
eventRouter.route('/events/code/:code').get(async (req, res) => {
    return res.json(await getEventsByAccess(req.params.code));
})


export default eventRouter;