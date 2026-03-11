// bcrypt is a library used to securely hash passwords before storing them in the database.
import bcrypt from 'bcrypt';

/**
 * SALT_ROUNDS is the cost factor used by bcrypt to determine how many times the password is processed during hashing.
 * Here, it defines, how strong the password hashing will be when using bcrypt.
 * It sets the number of salt rounds used to hash a password.
 * SALT_ROUNDS = 10 means bcrypt will apply the hashing algorithm (2)^10 times internally to make the password stronger.
 */
const SALT_ROUNDS=10;

export const hashPassword = async (password) => {

    /**
     * Hashes (encrypts) a user's password using bcrypt and returns the hashed password.
     * It is usually used during user registration before saving the password in the database.
     * bcrypt.hash() is a function from the bcrypt library that converts a plain text into a secure hashed password.
     */
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async(password, hashPassword) => {

    /**
     * Checks whether the user's entered password matches the hashed password stored in the database.
     * It is usually used during the user login.
     * bcrypt.compare() is a function from the bcrypt library that compares:
     *   - the plain text passward entered by the user.
     *   - the hashed password stored in the database.
     */
    return await bcrypt.compare(password, hashPassword);
};
