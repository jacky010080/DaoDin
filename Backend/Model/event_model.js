const pool = require('./db').pool;

const getEvent = async (myId, groupIdList) => {
    
    for(let i=0;i<groupIdList.length;i++){
        groupIdList[i] = parseInt(groupIdList[i]);
        let Query = ` INSERT INTO event (group_id, user_id)  VALUES (${groupIdList[i]}, ${myId})`;
        await pool.query(Query);

    }
    let Query = `   SELECT * , \`match\`.id AS match_id , event.id AS id FROM event 
                    LEFT JOIN \`group\` ON event.group_id = group.id
                    LEFT JOIN \`match\` ON \`match\`.group_id = \`group\`.id
                    LEFT JOIN match_user ON match_user.match_id = match.id
                    WHERE match_user.user_id = ${myId} AND event.user_id =${myId}
                    ORDER BY event.id DESC
                `;
    const [result] = await pool.query(Query);
    return result;

   
}
const readEvent = async (myId, eventId) => {
    let Query = `SELECT * FROM event WHERE user_id = ${myId} AND id = ${eventId} AND is_read = true`;
    const [read] = await pool.query(Query);
    Query = `SELECT * FROM event WHERE user_id = ${myId} AND id = ${eventId}`;
    const [exist] = await pool.query(Query);
    if(read.length > 0 || exist.length===0) return false;
    Query = `UPDATE event SET is_read = true WHERE user_id = ${myId} AND id = ${eventId}`;
    await pool.query(Query);
    return  parseInt(eventId);
}   

module.exports = {
    getEvent,
    readEvent
}