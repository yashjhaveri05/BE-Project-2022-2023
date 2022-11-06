const AppointmentSchema = `

    type viewAppointment {
        _id: ID!
        patientId: ID!
        doctorId: User!
        description: String!
        date: String!
        status: String!
        report: String
    }

    type getSpecificAppointment {
        _id: ID!
        patientId: User!
        doctorId: User!
        description: String!
        date: String!
        status: String!
        report: String
    }

    type Appointment {
        _id: ID!
        patientId: ID!
        doctorId: ID!
        description: String!
        date: String!
        status: String!
        report: String
    }

    input AppointmentInput {
        patientId: ID!
        doctorId: ID!
        description: String!
        date: String!
    }

    type Response {
        msg: String!
    }

    input IsValid {
        date: String!
        doctorId: ID!
    }

    type Graph {
        monday: Int
        tuesday: Int
        wednesday: Int
        thursday: Int
        friday: Int
        saturday: Int
        sunday: Int
    }

`

module.exports = {AppointmentSchema};