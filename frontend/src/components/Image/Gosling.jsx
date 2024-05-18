import goslingImage from "../../assets/gosling.jpg"

const Gosling = ({ className =""}) => {
  return (
    <img src={goslingImage} alt="gosling" className={className}/>
  )
}

export default Gosling