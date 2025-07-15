// app/admin/services/actions.js or actions.ts

'use server';

import connectDB from '@/lib/util';
import Service from '@/app/admin/model/service';
import { revalidatePath } from 'next/cache';

export async function deleteService(formData) {
  console.log('Form data received:', formData);
  const serviceId = formData.get('serviceId');
  console.log('Deleting service with ID:', serviceId);
  try {
    await connectDB();
    await Service.findByIdAndDelete(serviceId);
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'Failed to delete service' };
  }
}

export async function bulkDeleteServices(formData) {

  const serviceIds = formData.getAll('serviceIds');
  try {
    await connectDB();
    await Service.deleteMany({ _id: { $in: serviceIds } });
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    console.error('Error bulk deleting services:', error);
    return { success: false, error: 'Failed to bulk delete services' };
  }
}
