'use client';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';

import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
const route = () => {
	const form = useForm({});

	const state = useSelector((state: any) => state.userSlice);

	const { toast } = useToast();

	async function onSubmit(data: any) {
		console.log(data);

		try {
			const response = await axios.post('/api/create-shoppinglist',{
				username: state.user.username,
				shoppingCard: data.shoppingCard
			});


			toast({
				title: 'Success',
				description: 'Product added successfully',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			});
		}
	}

	const { fields, append, remove } = useFieldArray({
		name: 'shoppingCard',
		control: form.control,
	});

	return (
		<div className="p-4 flex flex-col">
			<h1 className="text-2xl font-bold">Shop</h1>
			<p className="text-gray-500">This is the shop page</p>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
					<div className="w-full">
						{fields.map((field, index) => (
							<div className="flex flex-row gap-4 my-2 w-full" key={field.id}>
								<FormField
									control={form.control}
									key={field.id + Math.random()}
									name={`shoppingCard.${index}.productName`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl className="w-full">
												<Input
													type="text"
													placeholder="Product Name"
													{...field}
													className="w-full"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									key={field.id + Math.random()}
									name={`shoppingCard.${index}.productUrl`}
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl className="w-full">
												<Input
													type="text"
													placeholder="Product URL"
													{...field}
													className="w-full"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}

						<div className="flex flex-row gap-5">
							<Button
								type="button"
								variant="destructive"
								size="sm"
								className={`${fields.length === 0 ? 'hidden' : ''} mt-2`}
								disabled={fields.length === 0}
								onClick={() => remove(0)}>
								<Minus className=" mr-2 ml-2 h-4 w-4" />
								First
							</Button>
							<Button
								type="button"
								variant="default"
								size="sm"
								className="mt-2"
								onClick={() => append({ productName: '', productUrl: '' })}>
								<Plus className=" mr-2 ml-2 h-4 w-4" />
								Add
							</Button>
							<Button
								type="button"
								variant="destructive"
								size="sm"
								className={`${fields.length === 0 ? 'hidden' : ''} mt-2`}
								disabled={fields.length === 0}
								onClick={() => remove(fields.length - 1)}>
								<Minus className=" mr-2 ml-2 h-4 w-4" />
								Last
							</Button>
						</div>
						<FormDescription className="mt-4 ">
							* After adding and removing please update so that it will be
							reflected on website.
						</FormDescription>
					</div>

					<Button type="submit">Update Shop</Button>
				</form>
			</Form>
		</div>
	);
};

export default route;
