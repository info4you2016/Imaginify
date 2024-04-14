import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TranformationForm from "@/components/shared/TranformationForm";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTransformationTypePage = async ({
	params: { type },
}: SearchParamProps) => {
	const { userId } = auth();
	const tranformation = transformationTypes[type];

	if (!userId) redirect("/sign-in");

	const user = await getUserById(userId);

	return (
		<>
			<Header title={tranformation.title} subtitle={tranformation.subTitle} />
			<TranformationForm
				action="Add"
				userId={user._id}
				type={tranformation.type as TransformationTypeKey}
				creditBalance={user.creditBalance}
			/>
		</>
	);
};

export default AddTransformationTypePage;
