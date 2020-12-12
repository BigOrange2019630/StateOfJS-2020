import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { spacing, fontWeight } from 'core/theme'

export default class LegendsItem extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        shortLabel: PropTypes.string,
        color: PropTypes.string,
        style: PropTypes.object.isRequired,
        chipSize: PropTypes.number.isRequired,
        chipStyle: PropTypes.object.isRequired,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
    }

    static defaultProps = {
        style: {},
        chipStyle: {},
    }

    handleMouseEnter = () => {
        const { onMouseEnter, id, label, color } = this.props
        if (onMouseEnter === undefined) return
        onMouseEnter({ id, label, color })
    }

    handleMouseLeave = () => {
        const { onMouseLeave, id, label, color } = this.props
        if (onMouseLeave === undefined) return
        onMouseLeave({ id, label, color })
    }

    handleClick = () => {
        const { onClick, id, label, color } = this.props
        if (onClick === undefined) return
        onClick({ id, label, color })
    }

    render() {
        const {
            color,
            label,
            shortLabel,
            chipSize,
            style,
            chipStyle,
            data,
            units,
            onMouseEnter,
            useShortLabels,
            layout,
        } = this.props

        const isInteractive = typeof onMouseEnter !== 'undefined'

        return (
            <Container
                className={`Legends__Item ${shortLabel ? 'Legends__Item--withKeyLabel' : ''}`}
                style={style}
                isInteractive={isInteractive}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.handleClick}
            >
                {color && (
                    <ChipWrapper layout={layout}>
                        <Chip
                            style={{
                                width: chipSize,
                                height: chipSize,
                                background: color,
                                ...chipStyle,
                            }}
                        />
                    </ChipWrapper>
                )}
                {!color && shortLabel && (
                    <KeyLabel layout={layout} className="Legends__Item__KeyLabel">
                        {shortLabel}{' '}
                    </KeyLabel>
                )}
                <Label
                    layout={layout}
                    className="Legends__Item__Label"
                    dangerouslySetInnerHTML={{
                        __html: useShortLabels ? shortLabel || label : label,
                    }}
                />
                {data && (
                    <Value layout={layout} className="Legends__Item__Value">
                        {units === 'percentage' ? `${data[units]}%` : data[units]}
                    </Value>
                )}
            </Container>
        )
    }
}

const Container = styled.tr`
    cursor: default;

    &:last-child {
        margin-bottom: 0;
    }

    ${(props) => {
        if (props.isInteractive) {
            return `
                cursor: pointer;
                &:hover {
                    background: ${props.theme.colors.backgroundAlt};
                }
            `
        }
    }}
`

const ChipWrapper = styled.th`
    padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
`
const Chip = styled.div``

const KeyLabel = styled.th`
    padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
    text-align: left;
`

const Label = styled.td`
    padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
    white-space: nowrap;
`

const Value = styled.td`
    font-weight: ${fontWeight('bold')};
    padding: ${spacing(0.25)} ${spacing(0.5)} ${spacing(0.25)} 0;
    width: 100%;
`
