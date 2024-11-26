import { FlattenedPerson, User } from "../interface/CommonInterface";

 
 export const deepFlattenToEnglish = (data: any, prefix: string = ''): any => {
    let flattened: { [key: string]: any } = {};
  
    for (const [key, value] of Object.entries(data)) {
      
      if (Array.isArray(value) && typeof value[0] !== 'string') {
        console.log(key+" Array ",value);
        flattened[prefix + key] = value.map((val) => deepFlattenToEnglish(val, ''));
        console.log(key+" After Array ",flattened[prefix+key]);
      } else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        if ('en' in value) {
          flattened[prefix + key] = value.en;
        } 
        else {
          const nested = deepFlattenToEnglish(value, `${prefix}${key}`);
          flattened = { ...flattened, ...nested };
        }
      } 
      else {
        flattened[prefix + key] = value;
      }
    }
  
    return flattened;
  };
  
  class CommonUtilityService {
    transformPerson(person: User): FlattenedPerson {
      const flattened = deepFlattenToEnglish(person);
      if (person.birth) {
        flattened.birthDate = person.birth.date;
      }
  
      return flattened as FlattenedPerson;
    }
  
    transformPersons(persons: User[]): FlattenedPerson[] {
      return persons.map(person => this.transformPerson(person));
    }
  }

  export default new CommonUtilityService();