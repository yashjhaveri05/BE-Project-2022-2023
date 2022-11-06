const { buildSchema } = require('graphql');
const { UserSchema } = require('./user.js');
const { AppointmentSchema } = require('./appoinment.js');

const buildschema =  buildSchema(`
    ${UserSchema}

    ${AppointmentSchema}

    type rootQuery {
        
        authUser(email: String!, password: String!): User!
        getUserProfile: User!
        getUsers: [User!]!
        getUserById(userId: ID!): User!
        getDoctors: [User!]!
        searchDoctorByName(searchTerm: String!): [User!]
        searchDoctorBySpecialization(searchTerm: String!, status: Boolean): [User!]
        searchParticularDoctor(userId: ID!): User!
        getStatistics_Users: String!
        getStatistics_Doctors: String!
        forgotPassword(email: String!): Response!

        viewAppointment(user_id: ID!): [viewAppointment!]!
        cancelAppointment(appointment_id: ID!): Response!
        changeStatus(appointment_id: ID!): Response!
        getAllAppointments(user_id: ID!) : [viewAppointment!]!
        getAllUpcomingAppointments(user_id: ID!) : [getSpecificAppointment!]!
        getAllPreviousAppointments(user_id: ID!) : [getSpecificAppointment!]!
        getStatistics_Appointment: String!
        getStatistics_Successful_App: String!
        isValid(IsValid: IsValid!): Response!
        graph: Graph!
    }

    type rootMutation {
        registerUser(userInput: UserInput!): User!
        updateUserProfile(userInput: UpdateUserInput!): User!
        updateUser(userId: ID!, userInput: UpdateUserInput!): User!
        deleteUser(userId: ID!): User!
        addReview(doctorId: ID!, reviewInput: ReviewInput!): Response!

        createAppointment(appointmentInput: AppointmentInput!): Appointment!
    }

    schema {
        query: rootQuery
        mutation: rootMutation
    }
`);

module.exports = buildschema;