import { SQL } from "../databconfig";

export async function checkIfFollow(userId: string, vacationId: string) {
  const [isFollow] = (await SQL(`
        SELECT vacations_of_users.* 
        FROM vacationdb.vacations_of_users
     WHERE vacations_of_users.user_id = ${userId} 
            AND  vacations_of_users.vacation_id = ${vacationId}
        `)) as any[];

  return !!isFollow;
}

export async function removeFollow(userId: string, vacationId: string) {
  await SQL(`
        delete from  vacationdb.vacations_of_users
        where user_id="${userId}" and vacation_id="${vacationId}";
        `);
  await SQL(`
            update vacations
               set followersNum = followersNum  - 1
                where vacationID= "${vacationId}"
            `);
}

export async function addFollow(userId: string, vacationId: string) {
  await SQL(`
            update vacations
               set followersNum = followersNum +1
                where vacationID= ${vacationId}
            `);
  await SQL(`
            INSERT INTO vacations_of_users
            (user_id, vacation_id)
            VALUES
            ("${userId}","${vacationId}")
            `);
}
