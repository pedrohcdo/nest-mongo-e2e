export default async () => {
	return global?.E2E_CONTEXT?.teardown()
}
