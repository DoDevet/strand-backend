import bcrypt from "bcrypt";
import client from "../../client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        const existUserName = await client.user.findFirst({
          where: {
            userName,
          },
        });
        if (existUserName) {
          return { ok: false, error: "Already exist Username" };
        }
        const existEmail = await client.user.findFirst({
          where: {
            email,
          },
        });
        if (existEmail) {
          return { ok: false, error: "Already exist Email" };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            userName,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};
