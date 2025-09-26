const pool = require("../connection/db");

class familiesModel {
    createFamily = async (nameFam, createdBy) => {
        const [familyId] = await pool('tb_families').insert({ 
            name:nameFam, 
            created_by: createdBy,
        }).returning('id');
        return familyId;
    };
    getAllFamilies = async () => {
        return pool('tb_families').select('*').orderBy('created_at', 'asc');
    };

    getFamilyByOwner = async (userId) => {
        return pool('tb_families').where({ created_by: userId });
    };

    getFamilyById = async (familyId) => {
        return pool('tb_families').where({ id: familyId }).first();
    };

    updateFamily = async (familyId, data) => {
        return pool('tb_families').where({ id: familyId }).update({
            ...data,
            updated_at: new Date()
        });
    };

    deleteFamily = async (familyId) => {
        return pool('tb_families').where({ id: familyId }).del();
    };

    createMembership = async (userId, familyId, permissionLevel) => {
        const [membershipId] = await db('tb_memberships').insert({
            user_id: userId,
            family_id: familyId,
            permission_level: permissionLevel
        }).returning('id');
        return membershipId;
    };

    getMembershipsByFamilyId = async (familyId) => {
        return pool('tb_memberships as t1')
            .select(
                't1.id',
                't1.permission_level',
                't1.created_at',
                't2.username', 
                't2.email'
            )
            .join('tb_users as t2', 't1.user_id', '=', 't2.id')
            .where('t1.family_id', familyId)
            .orderBy('t1.created_at', 'asc');
    };

    getMembership = async (userId, familyId) => {
        return pool('tb_memberships')
            .where({ user_id: userId, family_id: familyId })
            .first();
    };

    updatePermissionLevel = async (membershipId, newPermissionLevel) => {
        return pool('tb_memberships')
            .where({ id: membershipId })
            .update({
                permission_level: newPermissionLevel,
                updated_at: new Date()
            });
    };

    deleteMembership = async (membershipId) => {
        return pool('tb_memberships').where({ id: membershipId }).del();
    };
}

module.exports = new familiesModel();