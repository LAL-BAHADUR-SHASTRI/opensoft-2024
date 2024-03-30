import "./index.css"

const ArrangeComp = ({dat_arr, Component, dir}) => {
    return (
        <div className={dir}>
            {dat_arr.map((item, index) => (
            <Component key={index} data={item} />
        ))}
        </div>
    )
}

export default ArrangeComp;