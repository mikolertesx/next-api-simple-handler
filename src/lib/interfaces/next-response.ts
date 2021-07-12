export interface NextResponse {
	status: (statusCode: number) => NextResponse;
	json: (body: any) => NextResponse;
}