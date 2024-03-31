import "./index.css"

// dat_arr must be an array of objects each of which is to be passed in Component
const ArrangeComp = ({dat_arr, Component, dir, style, onTabChange}) => {
    return (
        <div className={dir} style={style ? style : {}}>
            {dat_arr.map((item, index) => (
            <Component key={index} data={item} onTabChange={onTabChange}/>
        ))}
        </div>
    )
}

export default ArrangeComp;