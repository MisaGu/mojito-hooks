import { ProfileResponse } from '../../domain/interfaces';
import { BaseQueryHookPropsWithForce } from '../../domain/interfaces/hooks.interface';
declare function selectorFn(
  response?: ProfileResponse,
): import('../../domain/interfaces/mojito-schema.interface').User | undefined;
export declare type UseMojitoUserData = ReturnType<typeof selectorFn>;
export declare type UseMojitoUserReturn = ReturnType<typeof useUser>;
export declare type UseMojitoUserProps = BaseQueryHookPropsWithForce<UseMojitoUserData>;
export declare function useUser({
  force,
  options,
}?: UseMojitoUserProps): import('../../domain/utils/gqlResult.utils').QueryResult<
  'user',
  any,
  Error
>;
export default useUser;
