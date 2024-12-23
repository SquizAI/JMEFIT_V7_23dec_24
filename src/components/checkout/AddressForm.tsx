import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { ShippingAddress } from '../../services/checkout';

interface AddressFormProps {
  type: 'shipping' | 'billing';
  address: ShippingAddress;
  onChange: (address: ShippingAddress) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ type, address, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-[#3dd8e8]" />
        <h3 className="text-lg font-semibold capitalize">{type} Address</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={address.firstName}
            onChange={(e) => onChange({ ...address, firstName: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={address.lastName}
            onChange={(e) => onChange({ ...address, lastName: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Address Line 1
        </label>
        <input
          type="text"
          value={address.address1}
          onChange={(e) => onChange({ ...address, address1: e.target.value })}
          className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          value={address.address2}
          onChange={(e) => onChange({ ...address, address2: e.target.value })}
          className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            City
          </label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => onChange({ ...address, city: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            State/Province
          </label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => onChange({ ...address, state: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => onChange({ ...address, postalCode: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => onChange({ ...address, phone: e.target.value })}
            className="w-full px-4 py-2 bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3dd8e8]"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;