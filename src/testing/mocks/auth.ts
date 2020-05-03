import { User } from '@app/auth/models/auth.model';
export { User };

export class MockUser implements User {
    id = 'TEST_ID';
    firstName = 'TEST_FIRST_NAME';
    lastName = 'TEST_LAST_NAME';
    email = 'TEST_EMAIL';
}
