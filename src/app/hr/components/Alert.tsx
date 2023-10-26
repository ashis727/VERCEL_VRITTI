import React from 'react';

type IconType = React.ComponentType<{ className: string }>;

type AIcon = {
    icon: IconType;
    color?: string;
    bgColor?: string;
};

type ACard = {
    icon?: AIcon[];
    bgColor?: string;
    borderColor?: string;
    description?: string;
};

const Alert = ({ icon, bgColor, borderColor, description }: ACard) => {
    const renderIconData = (iconData: AIcon) => {
        const Icon = iconData.icon;
        return (
            <Icon
                className={`${
                    iconData.color ? `[${iconData.color}]` : "text-primary"
                } text-lg`}
            />
        );
    };

    return (
        <div className={`border ${borderColor} ${bgColor} p-4 rounded-lg flex items-center h-auto`} role="alert">
            {icon && <div className="mr-4">{renderIconData(icon[0])}</div>}
            <div className="flex-1">
                {description}
            </div>
        </div>
    );
};

export default Alert;
