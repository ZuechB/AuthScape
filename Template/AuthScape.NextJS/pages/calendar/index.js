import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box } from '@mui/material';

export default function Calendar({currentUser}) {

    const events = [
        { title: 'Meeting', start: new Date() }
    ]

    // a custom render function
    function renderEventContent(eventInfo) {
        return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
        )
    }

    return (
        <Box >
            {/* <AddDomain open={true} handleClose={() => { */}

            {/* }} /> */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                eventContent={renderEventContent}
            />
        </Box>
    )
}
