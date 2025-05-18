const express = require('express')
const app = new express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
const flash = require('connect-flash');
app.use(flash());


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://asifasifmujeeb10:asifmujeeb@asifcluster0.bbnlolm.mongodb.net/DriveTestNew2?retryWrites=true&w=majority&appName=AsifCluster0', { useNewUrlParser: true })
app.listen(4000, () => {
    console.log('DriveTest App is listening on port 4000')
})

// ExpressSession section
const expressSession = require('express-session');
app.use(expressSession({ secret: 'keyboard cat' }))

// LoggedIn section
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next()
});

// Middlewares
const authMiddlewareDriver = require('./middleware/authMiddleware-Driver.js');
const authMiddlewareAdmin = require('./middleware/authMiddleware-Admin.js');
const authMiddlewareExaminer = require('./middleware/authMiddleware-Examiner.js');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware.js')

// Controllers
const homeController = require('./controllers/display/displayHomePage.js')
const loginController = require('./controllers/display/displayLoginPage.js')
const g2_testController = require('./controllers/display/displayG2Page.js')
const g_testController = require('./controllers/display/displayGPage.js')
const get_userController = require('./controllers/getUser.js')
const newUserController = require('./controllers/display/displayRegisterPage.js')
const logoutController = require('./controllers/logout.js')
const appointmentController = require('./controllers/display/displayAppointmentPage.js')
const getSlotsAppointmentController = require ('./controllers/getSlots-AppointmentPage.js')
const getSlotsG2Controller = require('./controllers/getSlots-G2.js')
const getSlotsGController = require('./controllers/getSlots-G.js')
const examinationGController = require('./controllers/display/displayExaminationPage.js')
const getappointmentsController = require('./controllers/getSlots-ExaminationPage.js')
const getResultsController = require('./controllers/display/displayResultsPage.js')
const storeResultsController = require('./controllers/storeResults.js')


const storeG2_TestController = require('./controllers/updateDriverDetails.js')
const updateCarDetailsController = require('./controllers/updateCarDetails.js')
const storeUserController = require('./controllers/storeUser.js')
const loginUserController = require('./controllers/login.js')
const registerAppointmentController = require('./controllers/storeSlot.js')
const bookingController = require('./controllers/bookAppointment.js')


// GET and POST request handlers
app.get('/', homeController)
app.get('/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/g2_test', authMiddlewareDriver, g2_testController)
app.get('/g_test', authMiddlewareDriver, g_testController)
app.get('/get_user', authMiddlewareDriver, get_userController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/logout', logoutController)
app.get('/appointment', authMiddlewareAdmin, appointmentController)
app.get('/appointment/getslots', authMiddlewareAdmin, getSlotsAppointmentController)
app.get('/g2_test/getslots', authMiddlewareDriver, getSlotsG2Controller)
app.get('/g_test/getslots', authMiddlewareDriver, getSlotsGController)
app.get('/examination', authMiddlewareExaminer, examinationGController)
app.get('/examination/getappointments', authMiddlewareExaminer, getappointmentsController)
app.get('/examination/results', authMiddlewareExaminer, getResultsController)
app.get('/save/results',authMiddlewareExaminer,storeResultsController)


app.post('/g2_test', authMiddlewareDriver, storeG2_TestController)
app.post('/updateCarDetails', authMiddlewareDriver, updateCarDetailsController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/appointment/register', authMiddlewareAdmin, registerAppointmentController)
app.post('/g2_test/booking', authMiddlewareDriver, bookingController)
app.post('/g_test/booking', authMiddlewareDriver, bookingController)