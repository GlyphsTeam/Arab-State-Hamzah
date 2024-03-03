import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function BusinessTime({ handlerChange , day , dayStatus}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']} sx={{
                
            }}>
                <TimePicker onChange={(e)=>handlerChange(e, day)} disabled={dayStatus}/>
            </DemoContainer>
        </LocalizationProvider>
    )
}

export default BusinessTime
