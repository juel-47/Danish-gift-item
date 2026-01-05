import { usePage } from "@inertiajs/react";

export default function Hello() {
    const { name } = usePage().props;
    return (
        <div>
            <h1 className="text-3xl font-bold mx-auto container mt-10 text-red-400">Hello from React + Inertia { name }</h1>
        </div>
    );

}