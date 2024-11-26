import axios from "axios";
import { useEffect, useState } from "react";
import RestUtilService from "../services/RestUtilService";
import { FlattenedPerson, User } from "../interface/CommonInterface";
import CommonUtilityService from "../services/CommonUtilityService";
import AppTable from "../app-table/AppTable";
import { Card } from "primereact/card";


const Home: React.FC = () => {

    const [users, setUsers] = useState<FlattenedPerson[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response: User[] = await RestUtilService.getAllUsers();
            const flattenedResponse: FlattenedPerson[] = CommonUtilityService.transformPersons(response);
            console.log(flattenedResponse)
            setUsers(flattenedResponse);
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
          }
        };
    
        fetchUsers();
      }, []);

    return (
        <>
            <Card title="Lauretues">
              <AppTable data={users} />  
            </Card>
            
        </>
    )
}

export default Home;