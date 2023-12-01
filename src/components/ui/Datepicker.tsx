import Flatpickr from "react-flatpickr";
import { useState, useEffect } from 'react'
import { FiCalendar } from "react-icons/fi";

type Props = {
    SelectedDate: string
    selectedDate: (date: string) => void
}

const Datepicker = (props: Props) => {
    const [DateField, setDateField] = useState<any>('');
    const { SelectedDate, selectedDate } = props

    useEffect(() => {
        if (DateField != null && DateField !== '') {
            selectedDate(DateField)
        }
    }, [DateField])

    useEffect(() => {
        if (SelectedDate != null) {
            // const inputDateString = SelectedDate;
            // const inputDate = new Date(SelectedDate);
            // const options2 = { year: 'numeric', month: 'long', day: 'numeric' };
            // const formattedDate = inputDate.toLocaleDateString('id-ID', options2);
            // const timeOptions = { hour: '2-digit', minute: '2-digit' };
            // const formattedTime = inputDate.toLocaleTimeString('id-ID', timeOptions);
            // const formattedDateTime = formattedDate + " - " + formattedTime + " WIB";
            // console.log('formattedDateTime', formattedDateTime)
            // setDateField(formattedDateTime)
        }

    }, [SelectedDate])

    const indonesianLocalization = {
        weekdays: {
            shorthand: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            longhand: [
                'Minggu',
                'Senin',
                'Selasa',
                'Rabu',
                'Kamis',
                'Jumat',
                'Sabtu',
            ],
        },
        months: {
            shorthand: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'Mei',
                'Jun',
                'Jul',
                'Ags',
                'Sep',
                'Okt',
                'Nov',
                'Des',
            ],
            longhand: [
                'Januari',
                'Februari',
                'Maret',
                'April',
                'Mei',
                'Juni',
                'Juli',
                'Agustus',
                'September',
                'Oktober',
                'November',
                'Desember',
            ],
        },
        firstDayOfWeek: 1,
        weekAbbreviation: 'Mg',
        // amPM: ['Siang', 'Malam'],
        amPM: ['WIB', 'WIB'],
    };

    const options: any = {
        locale: indonesianLocalization,
        weekNumbers: true,
        enableTime: true,
        time_24hr: true,
        altFormat: "F j, Y",
        minDate: "today",
        dateFormat: "d F Y - H:i K",
    }

    return (
        <>
            <div className={`merged w-100`}>
                <div className={`flex w-100 items-stretch inputGroup has-append has-prepend`}>
                    <span className="flex-none input-group-addon">
                        <div className="input-group-text  h-full prepend-slot">
                            <FiCalendar />
                        </div>
                    </span>
                    <div className="flex-1 w-100">
                        <div className={`relative fromGroup2 w-100`}>
                            <Flatpickr
                                data-enable-time={false}
                                style={{ background: '#FFFFFF' }}
                                className='input-group-control css-k9cfa-_wqd0a w-100 block w-full focus:outline-none py-2'
                                placeholder='Pilih tanggal disini'
                                options={options}
                                value={DateField}
                                defaultValue={DateField}
                                onChange={([date]) => {
                                    setDateField(date)
                                }}
                            />
                        </div>
                    </div>
                        <span className="flex-none input-group-addon right">
                            <div className="input-group-text  h-full append-slot"></div>
                        </span>

                </div>
            </div>

        </>
    )
};
export default Datepicker;