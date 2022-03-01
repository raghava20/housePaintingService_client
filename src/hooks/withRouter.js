import { useLocation, useNavigate, useParams } from "react-router-dom"

export function withRouter(Child) {
    return (props) => {
        let navigate = useNavigate()
        let params = useParams()
        let location = useLocation()
        return <Child {...props} navigate={navigate} params={params} location={location}></Child>
    }
}