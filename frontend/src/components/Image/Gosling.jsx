import goslingImage from "../../assets/gosling.jpg"

const Gosling = ({ size = 20, className =""}) => {
  return (
    <img src={goslingImage} alt="gosling" className={className}  style={{ width: size, height: size }}/>
  )
}

export default Gosling