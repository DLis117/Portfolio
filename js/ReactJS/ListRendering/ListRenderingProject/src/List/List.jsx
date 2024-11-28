import styles from '../List/List.module.css'
import propTypes from 'prop-types';
function ListofElements(props)
{
    return( <>
                <h1>{props.category}</h1>
                <ul>
                    {props.list.length>0&&props.list.map(x=><li key={x}>{x}</li>)}
                </ul>
            </>
          );
}

ListofElements.defaultProps=
{
    category: 'defaultCategory',
    list:[],
}

ListofElements.propTypes=
{
    list:propTypes.arrayOf(propTypes.string)
}
export default ListofElements;