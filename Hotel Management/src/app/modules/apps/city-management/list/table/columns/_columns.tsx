// @ts-nocheck
import {Column} from 'react-table'
import {ActionsCell} from './ActionsCell'
import {CustomHeader} from './CustomHeader'
import {User} from '../../core/_models'

const tableColumns: ReadonlyArray<Column<User>> = [
   {
    Header: (props) => <CustomHeader tableProps={props} title='State Name' className='min-w-125px' />,
    id: 'state_id',
    Cell: ({...props}) => <p>{props.data[props.row.index].state_id}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='City Name' className='min-w-125px' />,
    id: 'city_name',
    Cell: ({...props}) => <p>{props.data[props.row.index].city_name}</p>,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='status' className='min-w-125px' />,
    id: 'status',
    Cell: ({...props}) => {return props.data[props.row.index].status == 0 ? <span className="badge badge-warning">InActive</span> : <span className="badge badge-success">Active</span>},
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-center min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index]} />,
  },
]

export {tableColumns}